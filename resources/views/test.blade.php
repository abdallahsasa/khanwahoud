<!-- resources/views/test.blade.php -->
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="UTF-8">
    <title>Test Translation</title>
</head>
<body>
    <h1>{{ __('keys.english') }}</h1>
    <p>Current Locale: {{ app()->getLocale() }}</p>
</body>
</html>
