const DBIntroduceTrans = (data: DBIntroduce): Introduce => {
    return {
        mentorId : data.mentor_id,
        title : data.introduce_title,
        content :data.introduce_content,
        reviewCount : data.review_count,  
        coffeechatCount : data.coffeechat_count,
        rating: data.introduce_rating,
        // 태그
    };
};

export default DBIntroduceTrans;