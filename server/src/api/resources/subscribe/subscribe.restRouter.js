import express from "express"
import * as subscribeController from "./subscribe.controller"

export const subscribeRouter = express.Router()
// Remove Stripe dependency and use null for mock
const stripe = null

subscribeRouter
  .route("/invoices")
  .post((req, res) => subscribeController.retrieveInvoices(req, res, stripe))

subscribeRouter
  .route("/:id")
  .post((req, res) => subscribeController.subscribe(req, res, stripe))

subscribeRouter
  .route("/cancel/:id")
  .post((req, res) => subscribeController.cancel(req, res, stripe))
