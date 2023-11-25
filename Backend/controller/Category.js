
const category = require("../models/category");
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
// handler function for tags
exports.createCategory = async (req, res) => {
    try {
        // fetch data 
        const { name, description } = req.body;
        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "please fill all the details",
            });
        }
        // check either the category already exist or not
        const checkExistingCategory = await category.findOne({name});
        if(checkExistingCategory){
            return res.status(400).json({
                success:false,
                message:"Can't create as the category Already exists",
            })
        }
        // make a entry in db 
        const categoryDetails = await category.create({
            name: name,
            description: description,
            course:null
        });
        console.log("category details", categoryDetails);
        // return response
        return res.status(200).json({
            success: true,
            message: "category creation is successfull",
        })
    } catch (error) {
        console.log("error in the creation of category", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// handler 2 get all tags 
exports.getAllCategory = async (req, res) => {
    try {
        // just make a db call 
        const allCategory = await category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "all categorys returned successfully",
            allCategory,
        })
    } catch (error) {
        console.log("error in the showing all category", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// category based details
exports.categoryBasedDetails = async(req, res) =>{
    try {
        // get category id
        const {categoryId} = req.body;
        // get courses for sepcified ccategor id
        const selectedCategory = await category.findById(categoryId).populate({
            path: "courses",
            match: { status : "Published"},
            populate: "ratingAndReview",
            populate: "instructor"
        })
        // if no course founf ---> validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"NO course found for this clategory",
            });
        }
        // if no course found 
        // if(selectedCategory?.courses?.length === 0){
        //     // console.log("hi");
        //     return res.status(404).json({
        //         success: false,
        //         message:"No course found"
        //     })
        // }

        // get course from different category
        const categoriesExcepted = await category.find({
            _id: {
                $ne: categoryId
            }
        });

        // console.log("The categories except", categoriesExcepted);
        // const allOthersCat = getRandomInt(categoriesExcepted.length);
        // console.log("The all other cat id is: ", allOthersCat);

        const differenetCategories = await category.findOne(
            categoriesExcepted[getRandomInt(categoriesExcepted.length)]._id
        ).populate({
            path:"courses",
            match: {
                status: "Published",
            },
            populate:"instructor"
        }).exec();

        // all category 
        const allCategory = await category.find({}).populate({
            path: "courses",
            match:{
                status: "Published",
            },
            populate:"instructor"
        }).exec();

        // all courses
        const allCourses = allCategory.flatMap((category) => category.courses);
        // const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).slice(0, 10);

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differenetCategories,
                // mostSellingCourses,
                allCourses
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}