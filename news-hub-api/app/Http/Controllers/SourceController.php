<?php

namespace App\Http\Controllers;

use App\Models\Source;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $sources = Source::all();
        return response()->json($sources);
    }

    /**
     * @param Request $request
     * @param Source $source
     * @return JsonResponse
     */
    public function addPreferredSource(Request $request, Source $source): JsonResponse
    {
        $request->user()->preferredSources()->syncWithoutDetaching([$source->id]);
        return response()->json(['message' => 'Preferred source added']);
    }

    /**
     * @param Request $request
     * @param Source $source
     * @return JsonResponse
     */
    public function removePreferredSource(Request $request, Source $source): JsonResponse
    {
        $request->user()->preferredSources()->detach($source->id);
        return response()->json(['message' => 'Preferred source removed']);
    }
}
