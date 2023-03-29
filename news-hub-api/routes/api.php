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
    Route::get('articles/personalized', [ArticleController::class, 'personalized']);

    Route::get('/user/preferences', [UserController::class, 'Preferences']);
    Route::put('/user/preferences', [UserController::class, 'updatePreferences']);

});
