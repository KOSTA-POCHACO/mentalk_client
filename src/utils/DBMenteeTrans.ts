const DBMenteeTrans = (data: DBMentee): Mentee => {
    return {
        type: "Mentee",
        id: data.mentee_id,
        email: data.mentee_email,
        phone: data.mentee_phone,
        nickname: data.mentee_nickname,
        position: data.mentee_position,
        profileImg: data.mentee_img,
        gender: data.mentee_gender,
        warningCount: data.mentee_warning_count,
        favoriteCount: data.mentee_favorite_count,
        suspension: data.mentee_suspension,
        joinDate: data.mentee_createdAt,
    };
};

export default DBMenteeTrans;