<template>
  <main class="content">
    <section class="feed">
      <SectionHeader :sectionMeta="homeHeaderData" />
      <div class="feed-items">
        <feed :feedData="feedItems"/>
      </div>
      <div v-if="!isMobile" class="sidebar-ads">
        <ad-sidebar :sidebarData="sidebarAds"/>
      </div>
    </section>
  </main>
</template>

<script>
import compact from 'lodash/compact'
import flattenDeep from 'lodash/flattenDeep'
import zip from 'lodash/zip'
import chunk from 'lodash/chunk'
import SectionHeader from '@/components/PageComponents/SectionHeader'
import Feed from '@/components/PageComponents/Feed'
import AdSidebar from '@/components/PageComponents/AdSidebar'

export default {
  components: {
    Feed,
    AdSidebar,
    SectionHeader
  },
  async asyncData({ payload, isStatic, store, params }) {
    await store.dispatch('setCurrents', {
      slug: '',
      id: null
    })
    await store.dispatch('getPosts', {
      queryType: 'default',
      page: parseInt(params.page || 1)
    })
    await store.dispatch('getPage', {
      slug: 'home'
    })
  },
  computed: {
    isMobile: function() {
      if (this.$device.isMobile) {
        return true
      } else {
        return false
      }
    },
    posts() {
      return this.$store.getters.getPostsByPage({
        page: parseInt(this.$route.params.page || 1),
        queryType: 'default',
        query: ''
      })
    },
    ads() {
      return this.$store.state.advertising.rectangle
    },
    feedItems() {
      if (this.isMobile) {
        return compact(flattenDeep(zip(chunk(this.posts, 3), this.ads)))
      } else {
        return this.posts
      }
    },
    sidebarAds() {
      if (!this.isMobile) {
        return this.$store.state.advertising.rectangle
      } else {
        return []
      }
    },
    homeHeaderData() {
      const pageMeta = this.$store.getters.getPageBySlug('home').acf
      return {
        title: pageMeta.home_banner_headline,
        content: pageMeta.home_banner_content,
        img: pageMeta.home_figure,
        bg: pageMeta.home_background_image
      }
    }
  },
  head() {
    return {
      title: 'Dirt Rag Magazine',
      bodyAttrs: {
        class: 'home archive'
      },
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Dirt Rag Magazine'
        }
      ]
    }
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
</script>
