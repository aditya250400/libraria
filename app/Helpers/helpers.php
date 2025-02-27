<?php

use App\Models\User;

if (!function_exists('flashMessage')) {

    function flashMessage($message, $type = 'success')
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}

if (!function_exists('usernameGenerator')) {
    function usernameGenerator($name)
    {
        $username = strtolower(preg_replace('/\s+/', '_', trim($name)));

        $original_username = $username;

        $count = 1;

        while (User::where('username', $username)->exists()) {
            $username = $original_username . $count;
            $count++;
        }

        return $username;
    }
}
