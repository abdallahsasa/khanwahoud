<div class="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <div class="h-48 w-full overflow-hidden rounded-md mb-4">
        @php

$images = $record->images ?? null;
            if (is_string($images)) {
                $images = json_decode($images, true);
            } elseif (!is_array($images)) {
                $images = [];
            }

            \Log::info('Images data: ', ['images' => $images]);
        @endphp
        @if ($images && is_array($images) && count($images) > 0)
            <img src="{{ asset('storage/rooms/' . str_replace('rooms\/', '', $images[0])) }}" alt="{{ $record->name }}" class="w-full h-full object-cover">
        @else
            <div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">لا يوجد صورة</div>
        @endif
    </div>
    <h3 class="text-lg font-semibold text-gray-900">{{ $record->name ?? 'غير محدد' }}</h3>
    <p class="text-gray-600">الفئة: {{ $record->category ?? 'غير محدد' }}</p>
    <div class="mt-2">

    </div>
</div>
