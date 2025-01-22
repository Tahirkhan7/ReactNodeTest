const MeetingHistory = require('../../model/schema/meeting');

const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(201).json({ message: "Meeting created successfully", meeting });
    } catch (error) {
        res.status(500).json({ message: "Error creating meeting", error });
    }
};

const index = async (req, res) => {
    try {
        const meetings = await MeetingHistory.find({ deleted: false });
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching meetings", error });
    }
};

const view = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await MeetingHistory.findById(id);
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ message: "Error fetching meeting", error });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await MeetingHistory.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });
        res.status(200).json({ message: "Meeting deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting meeting", error });
    }
};

const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body;
        console.log(ids)
        await MeetingHistory.updateMany({ _id: { $in: ids } }, { deleted: true });
        res.status(200).json({ message: "Meetings deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting meetings", error });
    }
};

module.exports = { add, index, view, deleteData, deleteMany };
