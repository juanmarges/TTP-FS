# Web Portfolio App

## Overview

For this assessment, you’ll need to implement a web based stock portfolio app. Forthe purpose of this exercise a stock is simply an asset that can be bought or sold(like a house) at a price that continuously rises and falls throughout the day. Up todate pricing information is available for free via the IEX API. A guide to the UI can beobserved below. Your implementation doesn’t need to be an exact match but shouldimplement all of the listed user stories. In addition to the user stories, yoursubmission will be assessed for readability, code organization, commit historyclarity, overall UI/UX,  and overall API design.

## Requirements

* Node & NPM
* PostgreSQL

## Setup

1. Fork and/or clone this repo
2. Run `npm install`
3. For different OS
 3a. Mac and Linux users run `npm run start-dev`
 3b. Windows users will need to open Postgres via PgAdmin or the PSQL shell and create a database named `ttp-fs`. Then in two seperate terminals, run `npm run start-server` and `npm run build-client`
4. Open on your browser localhost:8080

## What You Can Do

* Register and log in users. Each user will begin with a $ 5000.00 starting balance in their account.
* Buy shares of stocks, both stocks you already own shares of and new stocks.
 * This application uses the IEX API to search the current price of a searched stock.
 * Any attempt to buy more than your current balance will be prevented, and the user will be notified that the purchase isn't allowed.
* View your portfolio
 * Shows your current balance, as well as total assets.
 * Compares the purchase price of your stocks to the current price. 
  * A higher current price will be shown in green 
  * A lower current price will be shown in red
  * An equal current price will be in black.
