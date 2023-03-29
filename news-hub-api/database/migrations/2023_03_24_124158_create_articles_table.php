<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source_id')->constrained();
            $table->foreignId('category_id')->constrained();
            $table->foreignId('author_id')->constrained();
            $table->string('title');
            $table->text('description');
            $table->text('content')->nullable();
            $table->string('author')->nullable();
            $table->string('url');
            $table->text('url_to_image')->nullable();
            $table->timestamp('published_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
