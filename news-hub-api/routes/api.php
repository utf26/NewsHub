<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('sources', SourceController::class)->except(['store', 'update', 'destroy']);
    Route::apiResource('categories', CategoryController::class)->except(['store', 'update', 'destroy']);
    Route::apiResource('articles', ArticleController::class)->only(['index']);

    // User preference routes
    Route::post('/preferred-sources/{source}', [SourceController::class, 'addPreferredSource']);
    Route::delete('/preferred-sources/{source}', [SourceController::class, 'removePreferredSource']);
    Route::post('/preferred-categories/{category}', [CategoryController::class, 'addPreferredCategory']);
    Route::delete('/preferred-categories/{category}', [CategoryController::class, 'removePreferredCategory']);

    Route::get('articles/personalized', [ArticleController::class, 'personalized']);

    Route::put('/user/preferences', [UserController::class, 'updatePreferences']);

});
