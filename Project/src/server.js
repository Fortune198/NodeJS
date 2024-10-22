const mongoose = require("mongoose");
const db = require("./models");

//function for creating tutorial
const createTutorial = function (tutorial) {
    return db.Tutorial.create(tutorial).then(docTutorial => {
        console.log("\n>> Created Tutorial:\n", docTutorial);
        return docTutorial;
    });
};

//tutorial for creating category
const createCategory = function (category) {
    return db.Category.create(category).then(docCategory => {
        console.log("\n>> Created Category:\n", docCategory);
        return docCategory;
    });
};

const addTutorialToCategory = function (tutorialId, categoryId) {
    return db.Tutorial.findByIdAndUpdate(
        tutorialId,
        { category: categoryId },
        { new: true, useFindAndModify: false }
    );
}


// const createImage = function (tutorialId, image) {
//     console.log("\n>> Add Image:\n", image);
//     return db.Tutorial.findByIdAndUpdate(
//         tutorialId,
//         {
//             $push: {
//                 images: {
//                     url: image.url,
//                     caption: image.caption
//                 }
//             }
//         },
//         { new: true, useFindAndModify: false }
//     );
// };

const createImage = function (tutorialId, image) {
    return db.Image.create(image).then(docImage => {
        console.log("\n>> Created Image:\n", docImage);
        return db.Tutorial.findByIdAndUpdate(
            tutorialId,
            {
                $push: {
                    images: {
                        _id: docImage._id,
                        url: docImage.url,
                        caption: docImage.caption
                    }
                }
            },
            { new: true, useFindAndModify: false }
        );
    });
};

const createComment = function (tutorialId, comment) {
    return db.Comment.create(comment).then(docComment => {
        console.log("\n>> Created Comment:\n", docComment);

        return db.Tutorial.findByIdAndUpdate(
            tutorialId,
            { $push: { comments: docComment._id } },
            { new: true, useFindAndModify: false }
        );
    });
};


//Using populate function to get full tutorial data
const getTutorialWithPopulate = function (id) {
    return db.Tutorial.findById(id).populate("comments", "-_id -__v");
};


const getTutorialsInCategory = function (categoryId) {
    return db.Tutorial.find({ category: categoryId })
        .populate("category", "name -_id")
        .select("-comments -images -__v");
};

const run = async function () {

    var tutorial = await createTutorial({
        title: "Tutorial #1",
        author: "Fortune Matshika"
    });

    //********CREATING CATEGORY********//
    var category = await createCategory({
        name: "Node.js",
        description: "Node.js tutorial"
    });

    await addTutorialToCategory(tutorial._id, category._id);

    var newTutorial = await createTutorial({
        title: "Tutorial #2",
        author: "Fortune Matshika"
    });

    await addTutorialToCategory(newTutorial._id, category._id);

    var tutorials = await getTutorialsInCategory(category._id);
    console.log("\n>> all Tutorials in Cagetory:\n", tutorials);

    //********CREATING COMMENTS********//
    // tutorial = await createComment(tutorial._id, {
    //     username: "Jack",
    //     text: "This is a great tutorial.",
    //     createdAt: Date.now()
    // });
    // console.log("\n>> Tutorial:\n", tutorial);

    // tutorial = await createComment(tutorial._id, {
    //     username: "Mary",
    //     text: "Thank you, it helps me alot.",
    //     createdAt: Date.now()
    // });
    // console.log("\n>> Tutorial:\n", tutorial);

    // tutorial = await createComment(tutorial._id, {
    //     username: "Rethabile",
    //     text: "Unfortunately, I didn't enjoy it.",
    //     createdAt: Date.now()
    // });
    // console.log("\n>> Tutorial:\n", tutorial);

    // tutorial = await getTutorialWithPopulate(tutorial._id);
    // console.log("\n>> populated Tutorial:\n", tutorial);

    //********CREATING IMAGES********//
    // tutorial = await createImage(tutorial._id, {
    //     path: "sites/uploads/images/mongodb.png",
    //     url: "/images/mongodb.png",
    //     caption: "MongoDB Database",
    //     createdAt: Date.now()
    // });
    // console.log("\n>> Tutorial:\n", tutorial);

    // tutorial = await createImage(tutorial._id, {
    //     path: "sites/uploads/images/one-to-many.png",
    //     url: "/images/one-to-many.png",
    //     caption: "One to Many Relationship",
    //     createdAt: Date.now()
    // });
    // console.log("\n>> Tutorial:\n", tutorial);
};



mongoose
    .connect("mongodb://localhost/bezkoder_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch(err => console.error("Connection error", err));

run();