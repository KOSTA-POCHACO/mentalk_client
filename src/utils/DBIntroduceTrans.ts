const DBIntroduceTrans = (data: DBIntroduce): Introduce => {
    return {
        introduceId : data.introduce_id,
        mentorId : data.mentor_id,
        title : data.introduce_title,
        content :data.introduce_content,
        reviewCount : data.review_count,  
        coffeechatCount : data.coffeechat_count,
        rating: data.introduce_rating,
        tag: data.tags,
    };
};

export default DBIntroduceTrans;