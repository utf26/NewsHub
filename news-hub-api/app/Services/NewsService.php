<?php

namespace App\Services;

use App\Models\Source;
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
        // Fetch articles from NewsAPI
        $this->fetchFromNewsAPI();

        // Fetch articles from The Guardian API
        $this->fetchFromTheGuardianAPI();

        // Fetch articles from The New York Times API
        $this->fetchFromNYTimesAPI();
    }

    /**
     * @return void
     */
    private function fetchFromNewsAPI(): void
    {
        $apiKey = config('services.newsapi.key');
        $url    = "https://newsapi.org/v2/top-headlines?country=us&apiKey={$apiKey}";

        $response = Http::get($url);

        if ($response->successful()) {
            $articles = $response->json()['articles'];

            // Process and store articles
            $this->processAndStoreArticles($articles, 'newsapi', 'general');
        }
    }

    /**
     * @return void
     */
    private function fetchFromTheGuardianAPI(): void
    {
        $apiKey = config('services.guardian.key');
        $url    = "https://content.guardianapis.com/search?api-key={$apiKey}";

        $response = Http::get($url);

        if ($response->successful()) {
            $articles = $response->json()['response']['results'];

            // Process and store articles
            $this->processAndStoreArticles($articles, 'the-guardian', 'general');
        }
    }

    /**
     * @return void
     */
    private function fetchFromNYTimesAPI(): void
    {
        $apiKey = config('services.nytimes.key');
        $url    = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key={$apiKey}";

        $response = Http::get($url);

        if ($response->successful()) {
            $articles = $response->json()['results'];

            // Process and store articles
            $this->processAndStoreArticles($articles, 'nytimes', 'general');
        }
    }

    /**
     * @param $articles
     * @param $sourceApiId
     * @param $categoryName
     * @return void
     */
    public function processAndStoreArticles($articles, $sourceApiId, $categoryName): void
    {
        // Find the source and category in the database
        $source   = Source::where('api_id', $sourceApiId)->first();
        $category = Category::where('name', $categoryName)->first();

        // If the source or category is not found, return early
        if (!$source || !$category) {
            return;
        }

        // Loop through the articles and store them in the database
        foreach ($articles as $article) {
            // Check if the article already exists in the database
            $existingArticle = Article::where('url', $article['url'])->first();

            // If the article already exists, skip it
            if ($existingArticle) {
                continue;
            }

            // Create a new Article model and fill in the data
            $newArticle               = new Article();
            $newArticle->source_id    = $source->id;
            $newArticle->category_id  = $category->id;
            $newArticle->title        = $article['title'];
            $newArticle->description  = $article['description'];
            $newArticle->content      = $article['content'];
            $newArticle->author       = $article['author'];
            $newArticle->url          = $article['url'];
            $newArticle->url_to_image = $article['urlToImage'];
            $newArticle->published_at = Carbon::parse($article['publishedAt']);

            // Save the new article to the database
            $newArticle->save();
        }
    }
}
