<template>
  <div class="advertising">
    <div v-if="contestPost">
      <PostAtom
        :id="contestPost.id"
        :key="contestPost.index"
        :slug="contestPost.slug"
        :title="contestPost.title.rendered"
        :date="contestPost.date"
        :excerpt="contestPost.excerpt.rendered"
        :pictureUrl="featuredImage(contestPost)"
        :author="`Dirt Rag Magazine`"
        :mode="`promotion`"
        :titleCallout="`Contest`"
      />
    </div>
    <OutsideFeed />
    <template v-for="ad in sidebarData">
      <advertising :id="ad.id" :size="ad.size" :unit="ad.name" :key="ad.index"/>
    </template>
  </div>
</template>

<script>
import Advertising from '@/components/Advertising'
import PostAtom from '@/components/PostAtom'
import OutsideFeed from '@/components/HeaderComponents/OutsideFeed'

export default {
  name: 'adSidebar',
  props: ['sidebarData'],
  components: {
    Advertising,
    PostAtom,
    OutsideFeed
  },
  computed: {
    contestPost: function() {
      return this.$store.state.contestPost[0]
    }
  },
  methods: {
    featuredImage: function(post) {
      // Return the post featured image
      if (post._embedded['wp:featuredmedia']) {
        let featuredImage = post._embedded['wp:featuredmedia'][0]
        if (featuredImage && post.categories[0] == '589') {
          return featuredImage.media_details.sizes.full.source_url
        } else if (featuredImage && featuredImage.media_details.sizes.medium) {
          return (
            featuredImage.media_details.sizes.medium.source_url ||
            featuredImage.media_details.sizes.full.source_url
          )
        } else {
          return '/og-card.png'
        }
      } else {
        return '/og-card.png'
      }
    }
  },
  mounted() {
    this.$store.dispatch('getContestPost')
  }
}
</script>

<style>
.advertising > div:not(:empty) {
  background: #f5f3ef;
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 0 1rem;
}
</style>
