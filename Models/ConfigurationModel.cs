using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.TypeProducts.Models
{
    public class ConfigurationModel : BaseNopModel
    {
     
        [NopResourceDisplayName("Plugins.Widgets.TypeProducts.NumberOfBestsellersOnHomepage")]
        [AllowHtml]
        public int NumberOfBestsellersOnHomepage { get; set; }

        [NopResourceDisplayName("Plugins.Widgets.TypeProducts.NumberOfNewProductOnHomepage")]
        [AllowHtml]
        public int NumberOfNewProductOnHomepage { get; set; }

        [NopResourceDisplayName("Plugins.Widgets.TypeProducts.NumberOfHomePageProductOnHomepage")]
        [AllowHtml]
        public int NumberOfHomePageProductOnHomepage { get; set; }
    }
}