<template>
  <main class="min-h-0 flex-1 overflow-hidden p-6" aria-label="メッセージを読み込み中" aria-busy="true">
    <div class="animate-pulse">
      <!-- 相手側 -->
      <div class="mb-4 flex justify-start">
        <div class="w-72 max-w-[70%] rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
            <div class="h-4 w-24 rounded bg-gray-200" />
          </div>

          <div class="mt-3 h-4 w-52 rounded bg-gray-200" />
          <div class="mt-2 h-4 w-36 rounded bg-gray-200" />

          <div class="mt-3 ml-auto h-3 w-12 rounded bg-gray-200" />
        </div>
      </div>

      <!-- 自分側 -->
      <div class="mb-4 flex justify-end">
        <div class="w-64 max-w-[70%] rounded-2xl rounded-br-md bg-blue-200 px-4 py-3 shadow">
          <div class="flex flex-row-reverse items-center gap-2">
            <div class="h-8 w-8 shrink-0 rounded-full bg-blue-100" />
            <div class="h-4 w-20 rounded bg-blue-100" />
          </div>

          <div class="mt-3 h-4 w-44 rounded bg-blue-100" />
          <div class="mt-2 h-4 w-28 rounded bg-blue-100" />

          <div class="mt-3 ml-auto h-3 w-12 rounded bg-blue-100" />
        </div>
      </div>

      <!-- 相手側 -->
      <div class="mb-4 flex justify-start">
        <div class="w-60 max-w-[70%] rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
            <div class="h-4 w-16 rounded bg-gray-200" />
          </div>

          <div class="mt-3 h-4 w-40 rounded bg-gray-200" />

          <div class="mt-3 ml-auto h-3 w-12 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  </main>
</template>