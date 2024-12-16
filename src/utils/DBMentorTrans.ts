const DBMentorTrans = (data: DBMentor): Mentor => {
    return {
        type: "Mentor",
        id: data.mentor_id,
        email: data.mentor_email,
        phone: data.mentor_phone,
        nickname: data.mentor_nickname,
        company: data.mentor_company,
        category: data.mentor_category,
        position: data.mentor_position,
        profileImg: data.mentor_img,
        paperImg: data.mentor_paper_img,
        career: data.mentor_career,
        isChecked: data.mentor_is_checked,
        gender: data.mentor_gender,
        warningCount: data.mentor_warning_count,
        favoriteCount: data.mentor_favorite_count,
        suspension: data.mentor_suspension,
        joinDate: data.mentor_createAt,
    };
};

export default DBMentorTrans;