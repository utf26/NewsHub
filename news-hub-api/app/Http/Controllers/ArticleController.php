<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        $search     = $request->input('search');
        $sourceId   = $request->input('source');
        $categoryId = $request->input('category');
        $start_date = $request->input('start_date');
        $end_date   = $request->input('end_date');
        $page       = $request->input('page', 1);     // default page number is 1
        $perPage    = $request->input('perPage', 10); // default number of items per page is 10

        // Get the user's preferred sources, categories and authors
        $user                = Auth::user();
        $preferredSources    = $user->preferredSources()->pluck('sources.id');
        $preferredCategories = $user->preferredCategories()->pluck('categories.id');
        $preferredAuthors    = $user->preferredAuthors()->pluck('authors.id');

        // Query articles
        $query = Article::with(['source', 'category', 'author'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($categoryId, function ($query) use ($categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($sourceId, function ($query) use ($sourceId) {
                $query->where('source_id', $sourceId);
            })
            ->when($start_date, function ($query) use ($start_date) {
                $query->where('published_at', '>=', $start_date);
            })
            ->when($end_date, function ($query) use ($end_date) {
                $end_date = Carbon::parse($end_date)->addDay()->toDateString();
                $query->where('published_at', '<', $end_date);
            })
            ->when(count($preferredSources), function ($query) use ($preferredSources) {
                $query->whereIn('source_id', $preferredSources);
            })
            ->when(count($preferredCategories), function ($query) use ($preferredCategories) {
                $query->whereIn('category_id', $preferredCategories);
            })
            ->when(count($preferredAuthors), function ($query) use ($preferredAuthors) {
                $query->whereIn('author_id', $preferredAuthors);
            })
            ->orderByDesc('published_at');

        // Execute the query and paginate the results
        $articles = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json($articles);
    }
}
