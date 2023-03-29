<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserPreferencesController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user = auth()->user();

        return response()->json([
            'categories' => $user->preferredCategories()->pluck('categories.id'),
            'sources'    => $user->preferredSources()->pluck('sources.id'),
            'authors'    => $user->preferredAuthors()->pluck('authors.id'),
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $user = auth()->user();

        $user->preferredCategories()->sync($request->categories);
        $user->preferredSources()->sync($request->sources);
        $user->preferredAuthors()->sync($request->authors);

        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
