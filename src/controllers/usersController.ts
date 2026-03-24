import express, { Request, Response } from 'express';
import User from '../models/user';

export const register = async (req: Request, res: Response) => {
    // create new user object, first from username
    const user = new User({ username: req.body.username });

    // then hash password
    await user.setPassword(req.body.password);

    // save to db
    await user.save();
    return res.status(201).json(user);
};