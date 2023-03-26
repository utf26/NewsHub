<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function updatePreferences(Request $request): JsonResponse
    {
        $user = auth()->user();

        $user->categories()->sync($request->categories);
        $user->sources()->sync($request->sources);

        return response()->json(['message' => 'Preferences updated successfully']);
    }

}
