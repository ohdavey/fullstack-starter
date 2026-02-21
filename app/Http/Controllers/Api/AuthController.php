<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $existing = DB::select('SELECT id FROM users WHERE email = ?', [$validated['email']]);
        if (!empty($existing)) {
            return response()->json(['error' => 'Email already in use.'], 422);
        }

        DB::insert(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [$validated['name'], $validated['email'], Hash::make($validated['password'])]
        );

        $id = DB::getPdo()->lastInsertId();
        $user = DB::select('SELECT id, name, email FROM users WHERE id = ?', [$id])[0];

        $userModel = \App\Models\User::find($id);
        $token = $userModel->createToken('api')->plainTextToken;

        return response()->json([
            'data' => ['token' => $token, 'user' => $user]
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $rows = DB::select('SELECT * FROM users WHERE email = ?', [$validated['email']]);

        if (empty($rows) || !Hash::check($validated['password'], $rows[0]->password)) {
            return response()->json(['error' => 'Invalid credentials.'], 401);
        }

        $user = $rows[0];

        DB::delete('DELETE FROM personal_access_tokens WHERE tokenable_id = ? AND tokenable_type = ?', [
            $user->id,
            'App\\Models\\User',
        ]);

        $userModel = \App\Models\User::find($user->id);
        $token = $userModel->createToken('api')->plainTextToken;

        return response()->json([
            'data' => [
                'token' => $token,
                'user'  => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                ],
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['data' => 'Logged out.']);
    }

    public function me(Request $request)
    {
        $userId = $request->user()->id;
        $rows = DB::select('SELECT id, name, email FROM users WHERE id = ?', [$userId]);

        if (empty($rows)) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        return response()->json(['data' => $rows[0]]);
    }
}
