import _ from 'lodash'

export default {
  // get a page by slug
  getPageBySlug: state => slug => {
    return state.pages.filter(page => page.slug === slug)[0]
  },
  // get a page by id
  getPageById: state => id => {
    return state.pages.filter(page => page.id === id)[0]
  },
  // get a post by slug
  getPostBySlug: state => slug => {
    return state.posts.filter(post => post.slug === slug)[0]
  },
  // get a post by id
  getPostById: state => id => {
    return state.posts.filter(post => post.id === id)[0]
  },
  // get all posts
  getPosts: state => {
    // sort by date
    const posts = state.posts.sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
    return posts
  },
  getCategoryBySlug: state => slug => {
    return state.categories.categories[slug]
  },
  // get page of posts
  getPostsPage: state => (page, cat) => {
    // filter all posts by category ID
    // then filter just the current page
    if (!cat) {
      const posts = state.posts.filter(post => post.page === page)
      // sort by date
      return posts.sort((a, b) => {
        return a.date < b.date ? 1 : -1
      })
    } else {
      const posts = state.posts
        .filter(post => post.categories.includes(cat))
        // Make posts aware of what category-page they're on
        .filter(post => post.categoryPage === page)
      // sort by date
      return posts.sort((a, b) => {
        return a.date < b.date ? 1 : -1
      })
    }
  }
}
