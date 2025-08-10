const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true},
  image: {type: String },
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    default: null 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['main', 'category', 'model', 'part'] 
  },
  path: { 
    type: String, 
    unique: true,
    index: true ,
  },
  flag:{
    type:Boolean,
    default:false
  },
  show_on:{
    type:String,
    default:null,
  }
});

categorySchema.pre('save', async function (next) {
  if (!this.isModified('name') && !this.isModified('parent')) {
    return next();
  }

  if (this.type === 'main') {
    this.path = this.name;
  } else if (this.parent) {
    const parentCategory = await mongoose.model('Category').findById(this.parent);
    if (!parentCategory) {
      return next(new Error('Parent category not found'));
    }
    this.path = `${parentCategory.path} > ${this.name}`;
  }

  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;