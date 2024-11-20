import { Request, Response } from "express";
import Thought from "../models/thought.js";
import User from "../models/user.js";

export const getThoughts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getThoughtById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: "Thought not found!" });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found!" });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(
      req.params.thoughtId
    );
    if (!deletedThought) {
      res.status(404).json({ message: "Thought not found!" });
      return;
    }

    await User.findByIdAndUpdate(deletedThought.username, {
      $pull: { thoughts: deletedThought._id },
    });
    res.json({ message: "Thought deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found!" });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found!" });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};
