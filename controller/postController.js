import postModel from "../model/post.js";
import { uploadFile } from "../service/service.js";

export async function create(req, res) {
  const { caption } = req.body;

  if (!caption || !req.file) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const result = await uploadFile(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`,
    );

    const post = await postModel.create({
      image: result.url,
      caption,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      post,
      message: "Post created Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Post not created",
    });
  }
}

export async function edit(req, res) {
  const { caption } = req.body;

  if (!caption) {
    return res.status(400).json({
      success: false,
      message: "Caption is required",
    });
  }

  try {
    const updateData = {
      caption,
    };

    if (req.file) {
      const result = await uploadFile(
        req.file.buffer,
        `${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`,
      );

      updateData.image = result.url;
    }

    const post = await postModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true },
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      post,
      message: "Post updated Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Post not updated",
    });
  }
}

export async function deletePost(req, res) {
  try {
    const post = await postModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Post not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Post not deleted",
    });
  }
}

export async function getAllPost(req, res) {
  try {
    const post = await postModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    if (!post) {
      return res.status(401).json({
        success: false,
        message: "Posts not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Posts not fetched",
    });
  }
}
