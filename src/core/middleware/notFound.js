const notFound = (req, res, next) => {
    res.status(404).json({ message: `the route ${req.path} is not found.` });
    console.log(`the route ${req.path} is not found`)
  };
  
 export{
    notFound,
 }