import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export function useReveal(target: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!target.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.value.dataset.revealed = 'true'
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        entry.target.setAttribute('data-revealed', 'true')
        observer?.disconnect()
      },
      { threshold: 0.14 },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
}
