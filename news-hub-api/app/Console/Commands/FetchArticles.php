<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Services\NewsService;
use Illuminate\Console\Command;

/**
 *
 */
class FetchArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch articles from various APIs';

    /**
     * @var NewsService
     */
    private NewsService $newsService;

    /**
     * @param NewsService $newsService
     */
    public function __construct(NewsService $newsService)
    {
        parent::__construct();

        $this->newsService = $newsService;
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // Call the fetchArticles method from the NewsService
        $this->newsService->fetchArticles();

        $this->info('Articles fetched successfully.');
    }
}
