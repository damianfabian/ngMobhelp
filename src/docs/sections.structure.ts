export default [
    {
      "label": "Main",
      "pages": [
          { 
            "label": "Mobiquity Contract",
            "icon": "car",
            "id": "car",
            "tabs": [
                {
                  "label": "Overview",
                  "template": "<div class='header'><img src='https://picsum.photos/id/235/200/300' /></div><div class='content'><p>Lorem Ipsum Overview</p></div>" 
                    
                },
                {
                  "label": "Docs",
                  "template": "<div class='content'><div class='list'><p class='list-item'><span class='icon'><i class='fas fa-home'></i></span>Featured</p><p class='list-item'><span class='icon'><i class='fas fa-home'></i></span>Featured 1</p></div>"
                },
                {
                  "label": "Links",
                  "template": "<div class='content'><div class='card'><div class='card-image'><a class='image' href='https://funda.nl' target='_blank'><img src='https://picsum.photos/id/235/300/180' alt='Funda' /></a></div></div></div>"
                }
            ]
          }
      ]
    },
    {
        "label": "Services",
        "pages": [
            { 
                "label": "Mobiquity Contract",
                "icon": "child",
                "id": "child",
                "tabs": [
                    {
                        "label": "Overview",
                        "template": "<div><p><img src={{image}} /></p><p>{{content}}</p></div>" 
                        
                    },
                    {
                        "label": "Docs",
                        "template": "<div><p><img src={{image}} /></p><p>{{content}}</p></div>" 
                    },
                    {
                        "label": "Links",
                        "template": "<div><p><img src={{image}} /></p><p>{{content}}</p></div>" 
                    }
                ]
            }
        ]
    }
  ]