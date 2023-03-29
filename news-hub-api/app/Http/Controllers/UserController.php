<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function Preferences(Request $request): JsonResponse
    {
        $user = auth()->user();

        return response()->json([
            'categories' => $user->preferredCategories->pluck('id'),
            'sources' => $user->preferredSources->pluck('id'),
            'authors' => $user->preferredAuthors->pluck('id'),
        ]);
    }

    public function updatePreferences(Request $request): JsonResponse
    {
        $user = auth()->user();

        $user->preferredCategories()->sync($request->categories);
        $user->preferredSources()->sync($request->sources);
        $user->preferredAuthors()->sync($request->authors);

        return response()->json(['message' => 'Preferences updated successfully']);
    }

}
