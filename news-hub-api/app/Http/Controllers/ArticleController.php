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
        $source = $request->input('source');
        $category = $request->input('category');

        // Build the query
        $query = Article::query();

        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%")
                ->orWhere('description', 'LIKE', "%{$search}%");
        }

        if ($source) {
            $query->whereHas('source', function ($query) use ($source) {
                $query->where('name', $source);
            });
        }

        if ($category) {
            $query->whereHas('category', function ($query) use ($category) {
                $query->where('name', $category);
            });
        }

        // Execute the query and paginate the results
        $articles = $query->paginate(10);

        return response()->json($articles);
    }

    /**
     * @return JsonResponse
     */
    public function personalized(): JsonResponse
    {
        // Get the authenticated user
        $user = Auth::user();

        // Fetch user preferences
        $preferences = $user->preferences;

        // Build the query using Eloquent
        $query = Article::query();

        $query->where(function ($subQuery) use ($preferences) {
            foreach ($preferences as $preference) {
                $subQuery->orWhere(function ($subSubQuery) use ($preference) {
                    if ($preference->source_id) {
                        $subSubQuery->where('source_id', $preference->source_id);
                    }

                    if ($preference->category_id) {
                        $subSubQuery->where('category_id', $preference->category_id);
                    }

                    if ($preference->author) {
                        $subSubQuery->where('author', $preference->author);
                    }
                });
            }
        });

        // Get the paginated results
        $articles = $query->paginate(10);

        return response()->json($articles);
    }
}
