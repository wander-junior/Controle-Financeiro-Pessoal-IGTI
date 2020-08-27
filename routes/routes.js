const express = require('express');
const transactionRouter = express.Router();
const transactionModule = require('../models/TransactionModel.js');

transactionRouter.get('/', async (_, res) => {
  try {
    const transaction = await transactionModule.find({});
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

transactionRouter.get('/:id', async (req, res) => {
  try {
    const transaction = await transactionModule.find({ _id: req.params.id });
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

transactionRouter.get('/date/:date', async (req, res) => {
  try {
    reqYear = req.params.date.slice(0, 4);
    reqMonth = req.params.date.slice(5, 7);
    const transaction = await transactionModule.find({
      year: reqYear,
      month: reqMonth,
    });
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

transactionRouter.post('/', async (req, res) => {
  try {
    const transaction = new transactionModule(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

transactionRouter.delete('/:id', async (req, res) => {
  try {
    const transaction = await transactionModule.findOneAndDelete({
      _id: req.params.id,
    });
    if (!transaction) {
      res.status(404).send('Documento não encontrado na coleção');
    }
    res.status(200).send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

transactionRouter.patch('/:id', async (req, res) => {
  try {
    const transaction = await transactionModule.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.send(transaction);
  } catch (error) {
    res.status(500).send(err);
  }
});

module.exports = transactionRouter;
