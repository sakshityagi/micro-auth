'use strict';

import User from './user.model';

const validationError = (res, statusCode) => {
    statusCode = statusCode || 422;
    return function(err) {
        return res.status(statusCode).json(err);
    };
};

const handleError = (res, statusCode) => {
    statusCode = statusCode || 500;
    return function(err) {
        return res.status(statusCode).send(err);
    };
};

/**
 * Creates a new user
 */
export const create = (req, res) => {
    
};

/**
 * Update user info
 */
export const updateUser = (req, res) => {};

/**
 * Get my info
 */
export function me(req, res, next) {}

export const findByToken = (token, cb) => {
    process.nextTick(() => {

    });
};
