<template>
  <main class="min-h-0 flex-1 overflow-hidden p-6" aria-label="メッセージを読み込み中" aria-busy="true">
    <div class="animate-pulse space-y-6">
      <div class="flex items-start gap-3">
        <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

        <div class="space-y-2">
          <div class="h-3 w-20 rounded bg-gray-200" />
          <div class="h-16 w-64 max-w-[60vw] rounded-2xl rounded-bl-md bg-gray-200" />
        </div>
      </div>

      <div class="flex justify-end">
        <div class="flex flex-row-reverse items-start gap-3">
          <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

          <div class="space-y-2">
            <div class="ml-auto h-3 w-16 rounded bg-gray-200" />
            <div class="h-20 w-72 max-w-[60vw] rounded-2xl rounded-br-md bg-gray-200" />
          </div>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

        <div class="space-y-2">
          <div class="h-3 w-24 rounded bg-gray-200" />
          <div class="h-12 w-48 max-w-[60vw] rounded-2xl rounded-bl-md bg-gray-200" />
        </div>
      </div>

      <div class="flex justify-end">
        <div class="flex flex-row-reverse items-start gap-3">
          <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

          <div class="space-y-2">
            <div class="ml-auto h-3 w-20 rounded bg-gray-200" />
            <div class="h-24 w-60 max-w-[60vw] rounded-2xl rounded-br-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>