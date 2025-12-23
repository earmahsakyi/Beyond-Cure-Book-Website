const HomeContent = require("../model/HomeContent");


/**
 * GET /api/home-content
 * Public
 */
exports.getHomeContent = async (req, res) => {
  try {

    
    

    const content = await HomeContent.findOne();

    if (!content) {
      return res.status(404).json({
        message: "Home content not found"
      });
    }

    res.status(200).json(content);
  } catch (error) {
    console.error("Get HomeContent error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/**
 * PUT /api/home-content
 * Admin only
 */
exports.updateHomeContent = async (req, res) => {
  try {
    const updatedContent = await HomeContent.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error("Update HomeContent error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
