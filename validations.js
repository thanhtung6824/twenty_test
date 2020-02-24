const createPost = {
  title: {
    notEmpty: true,
  },
  content: {
    notEmpty: true,
  }
};

const infoPost = {
  postId: {
    notEmpty: true,
  }
};

const updatePost = {
  id: {
    notEmpty: true,
  },
  title: {
    notEmpty: true,
    optional: true,
  },
  content: {
    notEmpty: true,
    optional: true,
  }
};

const deletePost = {
  id: {
    notEmpty: true,
  }
};

module.exports = {createPost, infoPost, updatePost, deletePost};
