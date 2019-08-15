const express = require('express')
const router = express.Router()
const Posts = require('../db.js');

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Could not retrieve posts :/`
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: `Post not found :/`
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Could not retrieve post :/`
    })
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Posts.findPostComments(req.params.id)
    if (comments) res.status(200).json(comments)
    else res.status(404).json({
      success: false,
      message: `couldn't be found`
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      err
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const post = await Posts.insert(req.body)
    res.status(201).json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Could not add post :/`
    })
  }
})

router.post('/:id/comments', async (req, res) => {
  try {
    console.log(req.body)
    const postID = req.params.id
    console.log(postID)
    const comment = await Posts.insertComment({...req.body, post_id: postID})
    res.status(201).json(comment)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Could not add comment :/`
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const postCount = await Posts.remove(req.params.id);
    if (postCount > 0) {
      res.status(200).json({
        message: `Post was deleted`
      })
    } else {
      res.status(404).json({
        message: `Could not find post with that ID`
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Could not remove post :|`
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const newPost = await Posts.update(req.body)
    res.status(201).json(newPost, {
      message: `Post updated`
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Couldn't fin any post with that ID :/`
    })
  }

})

module.exports = router