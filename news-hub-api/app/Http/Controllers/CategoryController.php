<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * @param Request $request
     * @param Category $category
     * @return JsonResponse
     */
    public function addPreferredCategory(Request $request, Category $category): JsonResponse
    {
        $request->user()->preferredCategories()->syncWithoutDetaching([$category->id]);
        return response()->json(['message' => 'Preferred category added']);
    }

    /**
     * @param Request $request
     * @param Category $category
     * @return JsonResponse
     */
    public function removePreferredCategory(Request $request, Category $category): JsonResponse
    {
        $request->user()->preferredCategories()->detach($category->id);
        return response()->json(['message' => 'Preferred category removed']);
    }
}
