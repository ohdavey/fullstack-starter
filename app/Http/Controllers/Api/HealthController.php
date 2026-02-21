<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class HealthController extends Controller
{
    public function index()
    {
        try {
            DB::select('SELECT 1');
            $db = true;
        } catch (\Exception $e) {
            $db = false;
        }

        try {
            Redis::ping();
            $redis = true;
        } catch (\Exception $e) {
            $redis = false;
        }

        return response()->json([
            'status' => 'ok',
            'db'     => $db,
            'redis'  => $redis,
        ], 200);
    }
}
