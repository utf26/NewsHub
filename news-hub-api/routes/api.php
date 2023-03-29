<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserPreferencesController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthorsController;
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

    Route::get('sources', [SourceController::class, 'index']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('authors', [AuthorsController::class, 'index']);
    Route::get('articles', [ArticleController::class, 'index']);

    Route::get('/user/preferences', [UserPreferencesController::class, 'index']);
    Route::put('/user/preferences', [UserPreferencesController::class, 'update']);

});
