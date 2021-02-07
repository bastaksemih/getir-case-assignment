'use strict';

const RecordController = module.exports = {};
const Record = require("../models/records")
const logger  = require('../utils/log-manager.js');
const validator = require('validator');
const moment = require('moment')


RecordController.getFilteredRecords = async function (req, res) {
    const payload = req.body;

    const {startDate, endDate, minCount, maxCount} = payload;
    try {
        //validate payload
        let validCode = validatePayload(payload)
        if (validCode === 0) {
            const records = await Record.aggregate([
                {
                    //data should following parameters
                    $project: {
                        _id: false,
                        key: true,
                        createdAt: true,
                        totalCount: {$sum: "$counts"}
                    },
                },
                {
                    // aggregation match criteria
                    $match: {
                        totalCount: {$gte: parseInt(minCount), $lte: parseInt(maxCount)},
                        createdAt: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        }
                    }
                },
            ]);

                    const responseObj = {
                        code: 0,
                        msg: 'Success',
                        records: records.map(item => ({
                            key: item.key,
                            createdAt: item.createdAt,
                            totalCount: item.totalCount,
                        })),
                    };
                    res.send(responseObj);

        } else {
            // return valid error response according to validation result
            let msg = "";
            switch (validCode) {
                case 2 :
                    msg = "Missing Parameters";
                    break;
                case 3 :
                    msg = "Start Date must be a valid date string";
                    break;
                case 4 :
                    msg = "End Date must be a valid date string";
                    break;
                case 5 :
                    msg = "Minimum Count must be a integer";
                    break;
                case 6 :
                    msg = "Maximum Count must be a integer";
                    break;
                case 7 :
                    msg = "Maximum Count must be bigger that Minimum Count";
                    break;
                case 8 :
                    msg = "Min or Max Count cannot be smaller than zero";
                    break;


            }
            const responseObj = {
                code: validCode,
                msg: msg,
                records: []
            }
            res.status(400).send(responseObj);
        }
    } catch (err) {
        logger.error(err.message)
        const responseObj = {
            code: 10,
            msg: 'Validation Error',
            records: []
        };
        res.status(500)
        res.send(responseObj);
    }
}

// Basic Validation for request payload
// startDate must be valid date format
// endDate must be valid date format
// minCount must be valid integer and must be smaller than maxCount
// maxCount must be valid integer
function validatePayload(payload){
    const { startDate, endDate, minCount, maxCount } = payload;
    if(startDate === undefined || endDate === undefined  || minCount === undefined || maxCount === undefined) {
        return 2;
    }
    else if(!moment(startDate, "YYYY-MM-DD", true).isValid()) {
        return 3;
    }
    else if(!moment(endDate, "YYYY-MM-DD", true).isValid()) {
        return 4;
    }
    else if(!validator.isInt(String(minCount))){
        return 5;
    }
    else if(!validator.isInt(String(maxCount))){
        return 6;
    }
    else if (!(0 <= +minCount && 0 < +maxCount)) {
        return 8;
    }
    else if (!(+minCount < +maxCount)) {
        return 7;
    }
    else {
        return 0;
    }
}

