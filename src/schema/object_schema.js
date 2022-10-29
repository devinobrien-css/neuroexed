export const blog = (media_title,media_type,media_date,media_source,media_content) => {
    const blog = {
            'title'  : {'S' : media_title},
            'data' : {
                'M': {
                    'media_type':{'S':media_type},
                    'media_title':{'S':media_title},
                    'media_date':{'S':media_date},
                    'media_source':{'S':media_source},
                    'media_content':{'S':media_content}
                }
            }
        }
    
    return blog
}

export const post = (title,date,content) => {

    return {
        'title'  : {'S' : title},
        'date'  : {'S' : date},
        'data' : {
            'M': {
                'content':{'S':content},
            }
        }
    }
}

export const message = (uid,from,subject,content,timestamp) => {

    return {
        'message_id'  : {'S' : uid},
        'timestamp'  : {'N' : ""+timestamp},
        'data' : {
            'M': {
                'content':{'S':content},
                'from':{'S':from},
                'subject':{'S':subject}
            }
        }
    }
}

export const log = (date,type,content) => {
    return {
        'date' : {'S' : date},
        'type' : {'S' : type},
        'content' : {'S' : content}
    }
}

export const sort_order = (type,order) => {
    return {
        'type' : {'S' : type},
        'sort' : {'L' : order}

    }
}

export const member = (first_name,last_name,collegiate_title,lab_title,year_joined,description,socials) => {
    return {
        'email':{'S':socials.email},
        'data':{
            'M' : {
                'first':{'S':first_name},
                'last':{'S':last_name},
                'slug':{'S':socials.email.split('@')[0]},
                'collegiate_title':{'S':collegiate_title},
                'lab_title':{'S':lab_title},
                'year_joined':{'S':year_joined},
                'description':{'S':description},
                'socials':{
                    'M' : {
                        'email':{'S':socials.email},
                        'twitter':{'S':socials.twitter},
                        'linkedin':{'S':socials.linkedin},
                        'instagram':{'S':socials.instagram}
                    }
                }
            }
        }
    }
}

export const project = (title,description,members=[]) => {
    return {
        'title':{'S':title},
        'data' : {
            'M':{
                'description':{'S':description},
                'members':{'L':members}
            }
        }
    }
}

export const affiliation = (title,source,slug) => {
    return {
        'name':{'S':title},
        'data' : {
            'M':{
                'source':{'S':source},
                'slug':{'S':slug}
            }
        }
    }
}