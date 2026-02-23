<!DOCTYPE html>
<html lang="en" class="bg-white dark:bg-gray-950 scheme-light dark:scheme-dark">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ config('app.name') }}</title>
    <link rel="icon" type="image/x-icon" href="{{ env('APP_FAVICON_URL', '/favicon.ico') }}" />
    @viteReactRefresh
    @vite(['resources/js/main.tsx'])
</head>

<body>
    <div id="app"></div>
</body>

</html>