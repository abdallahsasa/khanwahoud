<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ __('Redirecting...') }}</title>
    <script>
        (function() {
            var target = @json($url);
            if (target && typeof target === 'string') {
                window.location.replace(target);
            } else {
                window.location.replace('/');
            }
        })();
    </script>
    <noscript>
        <meta http-equiv="refresh" content="0;url={{ e($url) }}">
    </noscript>
</head>
<body>
    <p>{{ __('Redirecting...') }} <a href="{{ e($url) }}">{{ __('Click here if not redirected') }}</a></p>
</body>
</html>
