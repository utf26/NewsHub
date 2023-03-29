<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        // Get the search and filter parameters from the request
        $search = $request->input('search');
        $sourceId = $request->input('source');
        $categoryId = $request->input('category');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');

        // Build the query
        $query = Article::query()->with(['source', 'category']);

        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%")
                ->orWhere('description', 'LIKE', "%{$search}%");
        }

        if ($sourceId) {
            $query->whereHas('source', function ($query) use ($sourceId) {
                $query->where('id', $sourceId);
            });
        }

        if ($categoryId) {
            $query->whereHas('category', function ($query) use ($categoryId) {
                $query->where('id', $categoryId);
            });
        }

        // Filter by date
        if ($start_date) {
            $query->where('published_at', '>=', $start_date);
        }
        if ($end_date) {
            $query->where('published_at', '<=', $end_date);
        }

        $query->orderBy('published_at', 'DESC');

        // Execute the query and paginate the results
        $articles = $query->paginate(10);

        return response()->json($articles);
    }
}
