<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
 DB::listen(function ($query) {
            $currentUrl = Request::fullUrl();
            $startTime = microtime(true);

            $query->start = $startTime;
            $query->end = microtime(true);

            Log::info('Consulta SQL executada:', [
                'sql' => $query->sql,
                'bindings' => $query->bindings,
                'time' => $query->time . ' ms',
                'total_time' => number_format($query->end - $query->start, 2) . ' s',
                'url' => $currentUrl,
            ]);
        });
}
}