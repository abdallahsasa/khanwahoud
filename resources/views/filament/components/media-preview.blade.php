@php
$url = Storage::disk('public')->url($getState());
$isVideo = preg_match('/\.(mp4|mov|avi|webm)$/i', $url);
@endphp

@if ($isVideo)
<video autoplay muted loop class="w-32 h-auto max-h-64 py-3">
    <source src="{{ $url }}" type="video/mp4">
    Your browser does not support the video tag.
</video>
@else
<img src="{{ $url }}" alt="media" class="w-32 h-auto max-h-64 object-cover py-3" />
@endif
