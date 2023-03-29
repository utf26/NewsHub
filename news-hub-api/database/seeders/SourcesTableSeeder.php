<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SourcesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sources')->insert([
            [
                'name' => 'NewsAPI',
                'api_id' => env('NEWSAPI_KEY'),
            ],
            [
                'name' => 'The Guardian',
                'api_id' => env('GUARDIAN_API_KEY'),
            ],
            [
                'name' => 'The New York Times',
                'api_id' => env('NYTIMES_API_KEY'),
            ]
        ]);
    }
}
