const { json } = require('express');
const Customer = require('../models/Customer');
const mongoose = require('mongoose');

module.exports.homepageRoute = async (req, res) => {
    //const message = await req.consumeFlash('info')

    const locals = {
        title: 'Index From Controller',
        description: 'de'
    }

    let perPage = 10;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: {updatedAt: -1}} ])
                                  .skip(perPage * page - perPage)
                                  .limit(perPage)
                                  .exec();

        const count = await Customer.count();

        //const cus = await Customer.find({}).limit(20);     
        res.render('index', {
            locals,
            customers, 
            current: page, 
            pages: Math.ceil(count / perPage
        )});
    }
    catch(error) {
        console.log(error)
    }
    
}

module.exports.addCustomerPage = async (req, res) => {
    res.render('customer/add');
}

module.exports.createCustomer = async (req, res) => {
    console.log(req.body);
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        email: req.body.email,
        details: req.body.details
    })

    try {
        await Customer.create(newCustomer);
        //await req.flash('info', 'New customer has ben added')
        res.redirect('/');
    }
    catch(err) {
        console.log(err)
    }
}

module.exports.viewThatCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id})

        const locals = {
            title: 'VIew current customer',
            description: 'JFBiewwef'
        }

        res.render('customer/view', {
            customer,
            locals
        })
    }
    catch(error) {
        console.log(error)
    }
}

module.exports.editCustomerPage = async (req, res) => {
    const customer = await Customer.findById({ _id: req.params.id })

    const locals = {
        title: 'VIew current customer',
        description: 'JFBiewwef'
    }

    //console.log(customer)
    res.render('customer/edit', {
        customer,
        locals,
    })
}

module.exports.updateCustomer = async(req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            telephone: req.body.telephone,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now()
        })

        await res.redirect('/edit/'+req.params.id);
    }
    catch(error) {
        console.log(error)
    }
}

module.exports.deleteCustomer = async(req, res) => {
    try {
        await Customer.deleteOne({ _id: req.params.id});
        res.redirect('/');
    }
    catch(error) {
        console.log(error)
    }
}