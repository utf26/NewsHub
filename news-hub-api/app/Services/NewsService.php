<?php

namespace App\Services;

use App\Models\Source;
use App\Models\Author;
use App\Models\Category;
use App\Models\Article;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class NewsService
{
    /**
     * @return void
     */
    public function fetchArticles(): void
    {
        $categories = Category::all();

        foreach ($categories as $category) {
            // Fetch articles from NewsAPI
            $this->fetchFromNewsAPI($category);

            // Fetch articles from The Guardian API
            $this->fetchFromTheGuardianAPI($category);

            // Fetch articles from The New York Times API
            $this->fetchFromNYTimesAPI($category);
        }
    }


    /**
     * @param Category $category
     * @return void
     */
    private function fetchFromNewsAPI(Category $category): void
    {
        $apiKey = config('services.newsapi.key');
        $url    = "https://newsapi.org/v2/top-headlines?country=us&apiKey={$apiKey}";

        $response = Http::get($url);

        if ($response->successful()) {
            $articles = $response->json()['articles'];

            // Process and store articles
            $this->processAndStoreArticles($articles, 'NewsAPI', $category->name);
        }
    }

    /**
     * @param Category $category
     * @return void
     */
    private function fetchFromTheGuardianAPI(Category $category): void
    {
        $apiKey = config('services.guardian.key');
        $url    = "https://content.guardianapis.com/search?api-key={$apiKey}";

        $response = Http::get($url);

        if ($response->successful()) {
            $articles = $response->json()['response']['results'];

            // Process and store articles
            $this->processAndStoreArticles($articles, 'The Guardian', $category->name);
        }
    }

    /**
     * @param Category $category
     * @return void
     */
    private function fetchFromNYTimesAPI(Category $category): void
    {
        $apiKey = config('services.nytimes.key');
        $url    = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key={$apiKey}";

        $response = Http::get($url);

        if ($response->successful()) {
            $articles = $response->json()['results'];

            // Process and store articles
            $this->processAndStoreArticles($articles, 'The New York Times', $category->name);
        }
    }

    /**
     * @param $articles
     * @param $sourceApiName
     * @param $categoryName
     * @param $authorName
     * @return void
     */
    public function processAndStoreArticles($articles, $sourceApiName, $categoryName): void
    {
        // Find or create the source, category and author in the database
        $source   = Source::firstOrCreate(['name' => $sourceApiName]);
        $category = Category::firstOrCreate(['name' => $categoryName]);

        // If the source, category or author is not found, return early
        if (!$source || !$category) {
            return;
        }

        // Loop through the articles and store them in the database
        foreach ($articles as $article) {
            // Check if the article already exists in the database
            $existingArticle = Article::where('url', $article['url'] ?? $article['webUrl'] ?? $article['apiUrl'])->first();

            // If the article already exists, skip it
            if ($existingArticle) {
                continue;
            }

            $author = null;
            if (in_array('author', $article))
                $author = Author::firstOrCreate(['name' => $article['author']]);

            // Create a new Article model and fill in the data
            $newArticle               = new Article();
            $newArticle->source_id    = $source->id;
            $newArticle->category_id  = $category->id;
            $newArticle->author_id    = $author ? $author->id : null;
            $newArticle->title        = $article['title'] ?? $article['webTitle'] ?? '';
            $newArticle->description  = $article['description'] ?? $article['abstract'] ?? '';
            $newArticle->content      = $article['content'] ?? '';
            $newArticle->author       = $article['author'] ?? '';
            $newArticle->url          = $article['url'] ?? $article['webUrl'] ?? $article['apiUrl'];
            $newArticle->url_to_image = $article['urlToImage'] ?? '';
            $newArticle->published_at = Carbon::parse($article['publishedAt'] ?? $article['webPublicationDate'] ?? '');

            // Save the new article to the database
            $newArticle->save();
        }
    }
}
